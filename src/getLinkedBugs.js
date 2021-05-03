const getIssueDetails = async ({ inwardIssue }) => {
  const response = await AP.request({
    url: `/rest/api/latest/issue/${inwardIssue.key}`,
  })
  const { fields } = JSON.parse(response.body);

  // to be verified, based on task description:
  // if (fields.issuetype.name !== 'Bug') return

  // of course this could be optimized
  // by checking the issueLink type
  // even before executing the get issue call
  return ({
    summary: fields.summary,
    created: new Date(fields.created).toDateString(),
    assignee: fields.assignee?.displayName,
    status: fields.status.name,
    priority: fields.priority.name,
  })
}

const getLinkedIssueDetails = issueArr => {
  const linkedIssuePromises = issueArr.map(getIssueDetails)
  return Promise.all(linkedIssuePromises)
}

const getLinkedIssueList = async () => {
  const { jira: { issue: contextIssue } } = await AP.context.getContext()
  const issueLinksResponse = await AP.request({
    url: `/rest/api/latest/issue/${contextIssue.key}?fields=issuelinks`,
  })
  const { fields: { issuelinks: linkedIssueList } } = JSON.parse(issueLinksResponse.body);

  return linkedIssueList
}

const getLinkedBugs = async () => {
  try {
    const linkedIssueList = await getLinkedIssueList()

    if (!linkedIssueList.length) return []

    const result = await getLinkedIssueDetails(linkedIssueList)
    console.log(result)
    return result
  } catch (e) {
    // toDo: handle error
    console.log(e)
  }
}

export default getLinkedBugs
