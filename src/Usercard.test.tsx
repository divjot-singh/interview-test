import React from 'react'
import { render, screen } from '@testing-library/react'
import { User } from './interfaces/user'
import UserCard from './components/user_card'

test('renders User card correctly', () => {
  const userObj = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  }
  const user: User = userObj
  const onEdit = jest.fn(),
    onDelete = jest.fn()
  render(<UserCard user={user} onEdit={onEdit} onDelete={onDelete} />)
  const cardElement = screen.getByTestId('user-card')
  expect(cardElement).toBeInTheDocument()
  expect(cardElement).toHaveTextContent(user.name)
  expect(cardElement).toHaveTextContent(user.phone)
  expect(cardElement).toHaveTextContent(user.website)
  expect(cardElement).toHaveTextContent(userObj.address.suite)
  expect(cardElement).toHaveTextContent(userObj.address.street)
  expect(cardElement).toHaveTextContent(userObj.address.zipcode)
  expect(cardElement).toHaveTextContent(userObj.address.city)
  expect(cardElement).toHaveTextContent(userObj.company.name)
  expect(cardElement).toHaveTextContent(userObj.company.bs)
  expect(cardElement).toHaveTextContent(userObj.company.catchPhrase)
  const editButton = screen.getByTestId('edit-button')
  const deleteButton = screen.getByTestId('delete-button')
  expect(editButton).toBeInTheDocument()
  expect(deleteButton).toBeInTheDocument()
  editButton.click()
  deleteButton.click()
  expect(onEdit).toBeCalledWith(user)
  expect(onDelete).toBeCalledWith(1)
})
