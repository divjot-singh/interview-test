import React, { FC, useEffect, useState } from 'react'
import { User } from '../interfaces/user'
import UserCard from './user_card'
import '../styles/users_list.scss'
import AddUser from './add_user'
import { FaPlus } from 'react-icons/fa'

const UsersList: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [showAddUserDialog, setShowAddUserDialog] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User>()
  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      mode: 'cors'
    })
    const data = await response.json()
    setUsers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  const onDialogClose = () => {
    setSelectedUser(undefined)
    setShowAddUserDialog(false)
  }
  const onUserAdd = (updatedUser: User) => {
    if (updatedUser.id) {
      const newUsers = users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser
        }
        return user
      })
      setUsers(newUsers)
    } else {
      updatedUser.id = users.length + 1
      setUsers([...users, updatedUser])
    }
    onDialogClose()
  }
  const addNewUser: React.MouseEventHandler<HTMLDivElement> = () => {
    setSelectedUser(undefined)
    setShowAddUserDialog(true)
  }
  const onEdit = (user: User) => {
    setSelectedUser(user)
    setShowAddUserDialog(true)
  }
  const onDelete = (userId: number | undefined) => {
    if (!userId) return
    const newUsers = users.filter((user) => {
      return user.id !== userId
    })
    setUsers(newUsers)
  }
  return (
    <div className='users-list-container'>
      <h1>Users list</h1>
      <div className='users-list'>
        {users.map((user: User) => {
          return <UserCard user={user} key={user.id} onDelete={onDelete} onEdit={onEdit} />
        })}
      </div>
      <div className='add-button' onClick={addNewUser}>
        <FaPlus />
      </div>
      {showAddUserDialog && (
        <div className='dialog-container'>
          <AddUser user={selectedUser} onAdd={onUserAdd} onClose={onDialogClose} />
        </div>
      )}
    </div>
  )
}

export default UsersList
