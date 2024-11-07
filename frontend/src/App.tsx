import { useState } from "react"

const Messages = (): JSX.Element => {
  return (
    <h1>Message</h1>
  )
}

const Notifications = (): JSX.Element => {
  return (
    <h1>Notifications</h1>
  )
}

const Settings = (): JSX.Element => {
  return (
    <h1>Settings</h1>
  )
}

function App() {

  const [isOnMeassges, setIsOnMessages] = useState<boolean>(true)
  const [isOnNotifications, setIsOnNotifications] = useState<boolean>(false)
  const [isOnSettings, setIsOnSettings] = useState<boolean>(false)

  const handleMessages = () => {
    if (isOnNotifications) 
      setIsOnNotifications(!isOnNotifications);

    if (isOnSettings)
      setIsOnSettings(!isOnSettings);

    setIsOnMessages(!isOnMeassges)
  }

  const handleNotifications = () => {
    if (isOnMeassges)
      setIsOnMessages(!isOnMeassges);

    if (isOnSettings)
      setIsOnSettings(!isOnSettings);

    setIsOnNotifications(!isOnNotifications)
  }

  const handleSettings = () => {
    if (isOnMeassges)
      setIsOnMessages(!isOnMeassges);

    if (isOnNotifications)
      setIsOnNotifications(!isOnNotifications);

    setIsOnSettings(!isOnSettings)
  }

  return (
    <>
      <div className="absolute left-0 border-black border h-full w-72">
        {isOnMeassges && <Messages />}
        {isOnNotifications && <Notifications />}
        {isOnSettings && <Settings />}
        <div className="absolute bottom-0 border-black border h-10 w-full flex flex-row gap-2">
          <button onClick={handleMessages} className="w-fit h-fit">Messages</button>
          <button onClick={handleNotifications} className="w-fit h-fit">Notifications</button>
          <button onClick={handleSettings} className="w-fit h-fit">Settings</button>
        </div>
      </div>
      <main></main>
    </>
  )
}

export default App
