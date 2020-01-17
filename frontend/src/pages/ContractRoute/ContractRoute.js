import React from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { Contract } from "./Contract/Contract";
import { Paragraphs } from "./Paragraphs/Paragraphs";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ContractRoute() {
  let match = useRouteMatch();
  let query = useQuery();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:id/paragraphs`}>
          <Paragraphs
            page={query.get("page")}
            pageSize={query.get("pageSize")}
          />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Contract />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}
