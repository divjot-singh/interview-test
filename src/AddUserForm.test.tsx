import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { User } from './interfaces/user'
import AddUser from './components/add_user'

test('renders edit form correctly', () => {
  const userObj = {
    id: 1,
    name: 'Leanne Graham',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874'
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
  const onAdd = jest.fn(),
    onClose = jest.fn()
  render(<AddUser user={user} onAdd={onAdd} onClose={onClose} />)
  const formElement = screen.getByTestId('add-form')
  expect(formElement).toBeInTheDocument()
  expect(formElement).toHaveTextContent('Name')
  expect(screen.getByText('Name').nextSibling).toHaveValue(user.name)
  expect(formElement).toHaveTextContent('Phone number')
  expect(screen.getByText('Phone number').nextSibling).toHaveValue(user.phone)
  expect(formElement).toHaveTextContent('Website')
  expect(screen.getByText('Website').nextSibling).toHaveValue(user.website)
  expect(formElement).toHaveTextContent('Address')
  const suiteInput = screen.getByText('Address').nextSibling
  expect(suiteInput).toHaveValue(user.address?.suite)
  const streetInput = suiteInput?.nextSibling
  expect(streetInput).toHaveValue(user.address?.street)
  const cityInput = streetInput?.nextSibling
  expect(cityInput).toHaveValue(user.address?.city)
  const zipInput = cityInput?.nextSibling
  expect(zipInput).toHaveValue(user.address?.zipcode)
  expect(formElement).toHaveTextContent('Company')
  const companyNameInput = screen.getByText('Company').nextSibling
  expect(companyNameInput).toHaveValue(user.company?.name)
  const buisinessNameInput = companyNameInput?.nextSibling
  expect(buisinessNameInput).toHaveValue(user.company?.bs)
  const phraseInput = buisinessNameInput?.nextSibling
  expect(phraseInput).toHaveValue(user.company?.catchPhrase)
  const closeBtn = screen.getByTestId('close-btn')
  const submitBtn = screen.getByTestId('submit-btn')
  expect(closeBtn).toBeInTheDocument()
  expect(submitBtn).toBeInTheDocument()
  closeBtn.click()
  submitBtn.click()
  expect(onClose).toBeCalled()
  expect(onAdd).toBeCalledWith(user)
})
test('form inputs work correctly', () => {
  const onAdd = jest.fn(),
    onClose = jest.fn()
  render(<AddUser onAdd={onAdd} onClose={onClose} />)
  const inputElems: HTMLInputElement[] = screen.getAllByTestId('input')
  inputElems.forEach((input: HTMLInputElement) => {
    fireEvent.change(input, { target: { value: 'abcd' } })
    expect(input).toHaveValue('abcd')
  })
})

test('form submit works correctly', () => {
  const onAdd = jest.fn(),
    onClose = jest.fn()
  render(<AddUser onAdd={onAdd} onClose={onClose} />)
  const inputElems: HTMLInputElement[] = screen.getAllByTestId('input')
  const submitBtn: HTMLButtonElement = screen.getByTestId('submit-btn')
  inputElems.forEach((input: HTMLInputElement) => {
    fireEvent.change(input, { target: { value: 'abcd' } })
    expect(input).toHaveValue('abcd')
  })
  submitBtn.click()
  const user = {
    address: {
      city: 'abcd',
      street: 'abcd',
      suite: 'abcd',
      zipcode: 'abcd'
    },
    company: {
      bs: 'abcd',
      catchPhrase: 'abcd',
      name: 'abcd'
    },
    name: 'abcd',
    phone: 'abcd',
    website: 'abcd'
  }
  expect(onAdd).toBeCalledWith(user)
})
