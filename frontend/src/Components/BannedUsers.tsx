import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context } from '../Context/ContextProvider'

function BannedUsers() {
  const { loggedInUser } = useContext(Context)
  const { threadId } = useParams()
  const [thread, setThread] = useState<any>({})
  const [creator, setCreator] = useState<any>({})
  const [threadBans, setThreadBans] = useState<any>([])
  const [threadModerators, setThreadModerators] = useState<any>([])


  useEffect(() => {
    const getThreadById = async () => {
      const response = await fetch(`/rest/thread/${threadId}`);
      const res = await response.json();

      setThread(res)
      setCreator(res.creator)
      setThreadBans(res.threadBans)
      setThreadModerators(res.threadModerators)
      console.log(res)
    }

    getThreadById()
  }, [threadId])

  if (loggedInUser.id === creator.id || threadModerators.find((moderator: any) => moderator.id === loggedInUser.id)) {
    return (
      <div className="threadContainer">
        <h1>{thread.title}</h1>
        <div>
        <h3>Banned Users</h3>
        <ul>
          {threadBans.map(
            (bannedUser: { id: number; username: string }) => (
              <li key={bannedUser.id}>
                {bannedUser.username} <br />
                <button>Unban</button>
              </li>
            )
          )}
        </ul>
      </div>
      </div>
    )
  } else {
    return (
      <div className="threadContainer">
      <h1>You need to be a moderator och creator to see this page</h1>
    </div>
    )
  }
}

export default BannedUsers