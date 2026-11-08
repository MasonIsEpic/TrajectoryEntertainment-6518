import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";
import { Layout } from "./components/layout";
import { AdminGate } from "./components/admin-gate";
import { AdminLayout } from "./components/admin-layout";
import AdminSignIn from "./pages/admin-sign-in";
import AdminInbox from "./pages/admin-inbox";
import AdminProjects from "./pages/admin-projects";
import AdminEditor from "./pages/admin-editor";
import AdminPreview from "./pages/admin-preview";
import { Home, About, Services, Work, CaseStudy, Contact, NotFound } from "./pages/site";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/admin/sign-in" component={AdminSignIn} />
        <Route path="/admin/case-studies/:id/preview">
          <AdminGate>
            <AdminPreview />
          </AdminGate>
        </Route>
        <Route path="/admin/case-studies/:id">
          <AdminGate>
            <AdminLayout>
              <AdminEditor />
            </AdminLayout>
          </AdminGate>
        </Route>
        <Route path="/admin/case-studies">
          <AdminGate>
            <AdminLayout>
              <AdminProjects />
            </AdminLayout>
          </AdminGate>
        </Route>
        <Route path="/admin">
          <AdminGate>
            <AdminLayout>
              <AdminInbox />
            </AdminLayout>
          </AdminGate>
        </Route>
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/work" component={Work} />
              <Route path="/work/:slug" component={CaseStudy} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
      {import.meta.env.DEV && <AgentFeedback />}
      <RunableBadge />
    </Provider>
  );
}
export default App;
