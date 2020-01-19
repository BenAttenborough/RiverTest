import React from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
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
        <Route path={`${match.path}/:id`}>
          <Paragraphs
            page={query.get("page")}
            pageSize={query.get("pageSize")}
          />
        </Route>
      </Switch>
    </div>
  );
}
