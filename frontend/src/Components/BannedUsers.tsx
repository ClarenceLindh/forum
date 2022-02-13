import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context } from '../Context/ContextProvider'

function BannedUsers() {
  const { loggedInUser, whoAmI } = useContext(Context)
  const { threadId } = useParams()
  const [thread, setThread] = useState<any>({})
  const [creator, setCreator] = useState<any>({})
  const [threadBans, setThreadBans] = useState<any>([])
  const [threadModerators, setThreadModerators] = useState<any>([])
  const [usernameInput, setUsernameInput] = useState<string>("")

  const banUser = async () => {
    if (loggedInUser.username === usernameInput) {
      alert("You cannot ban yourself from a thread")
    }
    else if (threadBans.find((bannedUser: any) => bannedUser.username === usernameInput)) {
      alert("User " + usernameInput + " is already banned")
    }
    else if (threadModerators.find((moderator: any) => moderator.username === usernameInput)) {
      alert(usernameInput + " is a moderator. Remove " + usernameInput + " as moderator before banning.")
    }
    else {
      await fetch(`/rest/thread/${threadId}/ban/user/${usernameInput}`, {
        method: "POST"

      })
        .then(async (response) => await response.json())
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          alert(error)
          alert("User " + usernameInput + " does not exist")
          console.error(error);
        })
    }
  }

  const unbanUser = async (userId: number) => {
    fetch(`/rest/thread/${threadId}/unban/user/${userId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const getThreadById = async () => {
      const response = await fetch(`/rest/thread/${threadId}`);
      const res = await response.json();

      setThread(res)
      setCreator(res.creator)
      setThreadBans(res.threadBans)
      setThreadModerators(res.threadModerators)
    }
    getThreadById()
  }, [threadId])

  if (loggedInUser.id === creator.id ||
    threadModerators.find((moderator: any) => moderator.id === loggedInUser.id) ||
    loggedInUser.role === "ROLE_ADMIN") {
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
                  <button onClick={() => unbanUser(bannedUser.id)}>Unban</button>
                </li>
              )
            )}
          </ul>
          <h1>Ban user</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <button type='submit' onClick={
              
                banUser
              
              }>
                Ban user</button>
          </form>
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