const getLinkedBugsList = async () => {
  const { jira: { issue: contextIssue } } = await AP.context.getContext()
  const issueLinksResponse = await AP.request({
    url: `/rest/api/latest/issue/${contextIssue.key}?fields=issuelinks`,
  })
  const { fields: { issuelinks: linkedBugsList } } = JSON.parse(issueLinksResponse.body)

  return linkedBugsList
}

const getLinkedBugsDetails = issueArr => {
  const linkedBugsDetailPromises = issueArr.map(
    // toDo: pending condition
    // if (issue.issuetype.name !== 'Bug') return
    getBugDetails
  )
  return Promise.all(linkedBugsDetailPromises)
}

export const getLinkedBugs = async () => {
  try {
    const linkedBugsList = await getLinkedBugsList()
    const linkedBugs = await getLinkedBugsDetails(linkedBugsList)

    return linkedBugs
  } catch (e) {
    // toDo: handle error
    console.error(e)
  }
}

const getBugDetails = async ({ inwardIssue }) => {
  const response = await AP.request({
    url: `/rest/api/latest/issue/${inwardIssue.key}`,
  })
  const { fields } = JSON.parse(response.body)

  return ({
    summary: fields.summary,
    created: new Date(fields.created).toUTCString(),
    assignee: fields.assignee?.displayName,
    status: fields.status.name,
    priority: fields.priority.name,
  })
}
