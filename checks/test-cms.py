import os,json,re
from playwright.sync_api import sync_playwright,expect
from PIL import Image
Image.new('RGB',(320,180),'#ff6a24').save('checks/qa-cover.jpg')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://localhost:4200');page.wait_for_load_state('networkidle')
 anon=page.evaluate('''async()=>{const {client}=await import('/src/web/lib/api.ts');let results={};for(const [name,fn] of [['inbox',()=>client.inbox.list()],['adminProjects',()=>client.caseStudy.adminList()],['upload',()=>client.upload.presign({contentType:'image/jpeg',size:100})]]){try{await fn();results[name]='OPEN'}catch(e){results[name]=e.code}}return results}''')
 assert all(v=='UNAUTHORIZED' for v in anon.values()),anon
 print('Anonymous CMS APIs denied:',anon)
 page.goto('http://localhost:4200/admin');page.wait_for_url('**/admin/sign-in')
 page.locator('input[name=password]').fill(os.environ['CMS_INITIAL_PASSWORD']);page.get_by_role('button',name='SIGN IN',exact=True).click()
 page.wait_for_url('**/admin',timeout=20000);page.get_by_role('heading',name='INQUIRIES.').wait_for(timeout=15000)
 page.wait_for_load_state('networkidle');page.screenshot(path='checks/admin-inbox-desktop.png',full_page=True)
 print('Owner login successful')
 page.goto('http://localhost:4200/admin/case-studies');page.get_by_role('heading',name='CASE STUDIES.').wait_for();page.wait_for_load_state('networkidle');assert page.locator('.admin-project-row').count()==3
 page.screenshot(path='checks/admin-projects-desktop.png',full_page=True)
 page.get_by_role('link',name='NEW CASE STUDY',exact=True).click()
 page.get_by_label('Story title',exact=True).fill('QA CMS workflow')
 page.get_by_label('Client or organization').fill('QA test only')
 page.get_by_label('Service details').fill('Production / QA')
 page.get_by_label('Page URL slug').fill('qa-cms-workflow')
 page.get_by_label('Upload cover image').set_input_files('checks/qa-cover.jpg')
 expect(page.get_by_label("Cover image URL")).to_have_value(re.compile("^https://"),timeout=30000)
 uploaded=page.get_by_label('Cover image URL').input_value();assert '.tigrisfiles.io/' in uploaded
 print('Image upload successful')
 page.get_by_label('Image description').fill('QA test cover')
 page.get_by_label('The brief',exact=True).fill('A temporary QA test of the CMS draft workflow.')
 page.get_by_label('The approach',exact=True).fill('Verify create, preview, publish, and unpublish actions end to end.')
 page.get_by_label('Deliverables',exact=True).fill('Test deliverable one\nTest deliverable two')
 page.get_by_label('The outcome',exact=True).fill('A verified database-backed CMS workflow. This test will be removed.')
 page.get_by_role('button',name='SAVE DRAFT',exact=True).click();page.wait_for_url(re.compile(r'/admin/case-studies/[0-9]+$'),timeout=20000)
 page.wait_for_load_state('networkidle')
 project_id=int(page.url.rsplit('/',1)[-1]);open('checks/qa-project.json','w').write(json.dumps({'id':project_id,'image':uploaded}))
 print('Draft saved',project_id)
 page.screenshot(path='checks/admin-editor-desktop.png',full_page=True)
 public=page.evaluate('''async()=>{const {client}=await import('/src/web/lib/api.ts');return await client.caseStudy.get({slug:'qa-cms-workflow'})}''');assert public is None
 page.goto(f'http://localhost:4200/admin/case-studies/{project_id}/preview');page.get_by_role('heading',name='QA CMS WORKFLOW').wait_for();assert 'DRAFT — NOT PUBLIC' in page.locator('.preview-banner').inner_text()
 page.goto(f'http://localhost:4200/admin/case-studies/{project_id}');page.get_by_label('Visibility').select_option('published');page.get_by_label('Feature on homepage').check();page.get_by_label('Display order').fill('0');page.get_by_role('button',name='SAVE & PUBLISH',exact=True).click();page.get_by_text('Published. Your story is live on the website.',exact=True).wait_for(timeout=20000)
 page.goto('http://localhost:4200/work/qa-cms-workflow');page.get_by_role('heading',name='QA CMS WORKFLOW').wait_for();assert page.get_by_text('CONCEPT STUDY · NOT ACTUAL CLIENT WORK').count()==0
 page.goto('http://localhost:4200');page.wait_for_load_state('networkidle');assert any('QA CMS WORKFLOW' in title.upper() for title in page.locator('.project-card h3').all_inner_texts())
 print('Publication and featured homepage verified')
 page.goto(f'http://localhost:4200/admin/case-studies/{project_id}');page.get_by_label('Visibility').select_option('draft');page.get_by_role('button',name='SAVE DRAFT',exact=True).click();page.get_by_text('Draft saved. Only you can see this story.',exact=True).wait_for(timeout=20000)
 page.goto('http://localhost:4200/work/qa-cms-workflow');page.get_by_text('BACK ON COURSE.').wait_for();print('Unpublished story not publicly accessible')
 # Test archive/read with a QA inquiry only.
 qa_id=page.evaluate('''async()=>{const {client}=await import('/src/web/lib/api.ts');const r=await client.inquiries.create({name:'CMS QA inquiry',email:'qa@example.com',service:'Post-production',message:'QA test of the inbox. This test will be removed.'});return r.id}''')
 open('checks/qa-inquiry.json','w').write(json.dumps({'id':qa_id}))
 page.goto('http://localhost:4200/admin');page.get_by_role('button').filter(has_text='CMS QA inquiry').click();page.wait_for_load_state('networkidle');assert page.locator('.inquiry-detail h2').inner_text()=='CMS QA INQUIRY'
 page.get_by_role('button',name='Mark unread',exact=True).click();page.get_by_role('button',name='Mark read',exact=True).wait_for();page.get_by_role('button',name='Archive',exact=True).click();page.get_by_role('button',name='Move to inbox',exact=True).wait_for();page.get_by_role('button',name='Archived',exact=True).click();assert page.locator('.inquiry-item').filter(has_text='CMS QA inquiry').count()==1
 page.get_by_role('button',name='Move to inbox',exact=True).click();page.get_by_role('button',name='Archive',exact=True).wait_for();print('Inbox read/unread/archive/restore verified')
 for route in ['/','/about','/services','/work','/work/live-in-full-color','/contact','/admin','/admin/case-studies',f'/admin/case-studies/{project_id}']:
  page.goto('http://localhost:4200'+route);page.wait_for_load_state('networkidle');page.set_viewport_size({'width':390,'height':844});assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),route
  if route=='/about':page.locator('.founder-section').scroll_into_view_if_needed();page.screenshot(path='checks/about-founder-mobile.png',full_page=True)
  if route=='/admin/case-studies':page.screenshot(path='checks/admin-projects-mobile.png',full_page=True)
  page.set_viewport_size({'width':1440,'height':1000})
 page.goto('http://localhost:4200/about');page.locator('.founder-section').scroll_into_view_if_needed();page.wait_for_load_state('networkidle');page.screenshot(path='checks/about-founder-desktop.png',full_page=True)
 assert page.locator('.founder-section .social-links a').count()==5;assert page.locator('footer .social-links a').count()==5;assert page.locator('.eyebrow').count()==0
 page.goto('http://localhost:4200/admin');page.get_by_role('button',name='Sign out',exact=True).click();page.wait_for_url('**/admin/sign-in');assert not page.evaluate('localStorage.getItem("trajectory-admin-token")')
 print('Sign-out and social links verified. Browser errors:',errors)
 b.close()
