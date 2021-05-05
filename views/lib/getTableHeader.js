const createHead = () => {
  return {
    cells: [
      {
        key: "summary",
        content: "summary",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "created",
        content: "created",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "assignee",
        content: "assignee",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "status",
        content: "status",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "priority",
        content: "priority",
        shouldTruncate: true,
        isSortable: true,
      },
      {
        key: "actions",
        content: "",
      },
    ],
  };
};

export const head = createHead();
