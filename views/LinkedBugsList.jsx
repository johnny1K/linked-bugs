import "regenerator-runtime/runtime.js";
import React, { useEffect, useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { getLinkedBugs } from "./lib/getLinkedBugs";
import { head } from "./lib/getTableHeader";

const LinkedBugsList = () => {
  const [useBugs, setUseBugs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBugs() {
      const bugs = await getLinkedBugs();
      setUseBugs(bugs);
      setIsLoading(false);
    }
    getBugs();
  }, []);

  const handleDeleteRowClick = (bugId) => {
    setUseBugs([...useBugs].filter((bug) => bug.id !== bugId));
  };

  const rows = Object.values(useBugs).map(
    ({ id, summary, created, assignee, status, priority }) => ({
      key: `row-${id}`,
      cells: [
        {
          content: summary,
        },
        {
          content: created,
        },
        {
          content: assignee,
        },
        {
          content: status,
        },
        {
          content: priority,
        },
        {
          content: <a onClick={() => handleDeleteRowClick(id)}>x</a>,
        },
      ],
    })
  );

  return (
    <DynamicTable
      head={head}
      rows={rows}
      isLoading={isLoading}
      loadingSpinnerSize="small"
      emptyView={"No linked bugs found."}
    />
  );
};

export default LinkedBugsList;
