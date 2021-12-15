import React, { FC } from 'react'
import { Address, Company, User } from '../interfaces/user'
import '../styles/user_card.scss'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface UserCardProps {
  user: User
  onEdit: (user: User) => void
  onDelete: (userId: number | undefined) => void
}

const UserCard: FC<UserCardProps> = (props) => {
  const user: User = props.user,
    { onEdit, onDelete } = props
  const getAddressMarkup: () => JSX.Element | null = () => {
    const address: Address | undefined = user.address
    if (address) {
      const { suite, street, city, zipcode } = address
      return (
        <div className='info-item address'>
          <label>Address:</label> {`${suite}, ${street}, ${city}, ${zipcode}`}
        </div>
      )
    }
    return null
  }
  const getCompanyMarkup: () => JSX.Element | null = () => {
    const company: Company | undefined = user.company
    if (company) {
      const { bs, catchPhrase, name } = company
      return (
        <div className='info-item company'>
          <label>Company:</label> {`${name}, ${bs}, ${catchPhrase}`}
        </div>
      )
    }
    return null
  }
  return (
    <div className='user-card' data-testid='user-card'>
      <div className='name info-item'>
        <label>Name:</label> {user.name}
      </div>
      <div className='phone info-item'>
        <label>Phone:</label> {user.phone}
      </div>
      {user.website && (
        <div className='website info-item'>
          <label>Website:</label> {user.website}
        </div>
      )}
      {getAddressMarkup()}
      {getCompanyMarkup()}
      <div className='controls'>
        <span className='control edit' onClick={() => onEdit(user)} data-testid='edit-button'>
          <FaEdit />
        </span>
        <span
          className='control delete'
          onClick={() => onDelete(user.id)}
          data-testid='delete-button'
        >
          <FaTrash />
        </span>
      </div>
    </div>
  )
}

export default UserCard
