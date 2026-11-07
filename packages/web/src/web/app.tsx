import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";
import { Layout } from "./components/layout";
import { Home, About, Services, Work, CaseStudy, Contact, NotFound } from "./pages/site";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
function App() {
  return (
    <Provider>
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
      {import.meta.env.DEV && <AgentFeedback />}
      <RunableBadge />
    </Provider>
  );
}
export default App;
