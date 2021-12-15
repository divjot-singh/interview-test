import React, { FC, useState } from 'react'
import { User } from '../interfaces/user'
import '../styles/add_user_form.scss'

interface AddUserProps {
  user?: User
  onAdd: (user: User) => void
  onClose: React.MouseEventHandler<HTMLButtonElement>
}

enum FormElements {
  name,
  phone,
  suite,
  street,
  city,
  website,
  zip,
  company,
  business,
  phrase
}

const AddUser: FC<AddUserProps> = (props) => {
  const initUser: User | undefined = props.user
  const {
    id,
    name: nameInit = '',
    website: websiteInit = '',
    phone: phoneInit = '',
    address,
    company: companyInit
  } = initUser || {}
  const [name, setName] = useState<string>(nameInit)
  const [phone, setPhone] = useState<string>(phoneInit)
  const [website, setWebsite] = useState<string>(websiteInit)
  const [suite, setSuite] = useState<string>(address?.suite ?? '')
  const [street, setStreet] = useState<string>(address?.street ?? '')
  const [city, setCity] = useState<string>(address?.city ?? '')
  const [zip, setZip] = useState<string>(address?.zipcode ?? '')
  const [company, setCompany] = useState<string>(companyInit?.name ?? '')
  const [business, setBusiness] = useState<string>(companyInit?.bs ?? '')
  const [phrase, setPhrase] = useState<string>(companyInit?.catchPhrase ?? '')

  const handleChange = (value: string, type: FormElements) => {
    value = value.trim()
    switch (type) {
      case FormElements.name:
        setName(value)
        break
      case FormElements.phone:
        setPhone(value)
        break
      case FormElements.website:
        setWebsite(value)
        break
      case FormElements.suite:
        setSuite(value)
        break
      case FormElements.street:
        setStreet(value)
        break
      case FormElements.city:
        setCity(value)
        break
      case FormElements.zip:
        setZip(value)
        break
      case FormElements.company:
        setCompany(value)
        break
      case FormElements.business:
        setBusiness(value)
        break
      case FormElements.phrase:
        setPhrase(value)
        break
    }
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const user: User = {
      name,
      phone,
      website
    }
    if (id) {
      user.id = id
    }
    if (street || city || suite || zip) {
      user.address = {
        street,
        city,
        suite,
        zipcode: zip
      }
    }
    if (business || phrase || company) {
      user.company = {
        bs: business,
        catchPhrase: phrase,
        name: company
      }
    }
    props.onAdd(user)
    event.preventDefault()
  }
  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onClose(event)
    event.preventDefault()
  }
  return (
    <div className='add-user-form'>
      <form onSubmit={onSubmit} data-testid='add-form'>
        <div className='form-element'>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            id='name'
            value={name}
            placeholder='Name'
            data-testid='input'
            required
            onChange={(e) => handleChange(e.target.value, FormElements.name)}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='phone'>Phone number</label>
          <input
            name='phone'
            id='phone'
            value={phone}
            placeholder='Phone number (912-77-212)'
            type='tel'
            data-testid='input'
            required
            pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
            onChange={(e) => handleChange(e.target.value, FormElements.phone)}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='website'>Website</label>
          <input
            name='website'
            id='website'
            value={website}
            placeholder='Website'
            data-testid='input'
            type='url'
            onChange={(e) => handleChange(e.target.value, FormElements.website)}
          />
        </div>
        <div className='form-element multiline'>
          <label htmlFor='address'>Address</label>
          <input
            name='address'
            id='address'
            value={suite}
            placeholder='Apartment/Suite'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.suite)}
          />
          <input
            name='street'
            id='street'
            value={street}
            placeholder='Street'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.street)}
          />
          <input
            name='city'
            id='city'
            value={city}
            placeholder='City'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.city)}
          />
          <input
            name='zip'
            id='zip'
            value={zip}
            placeholder='Zip code'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.zip)}
          />
        </div>
        <div className='form-element multiline'>
          <label htmlFor='company'>Company</label>
          <input
            name='company'
            id='company'
            value={company}
            placeholder='Company Name'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.company)}
          />
          <input
            name='business'
            id='business'
            value={business}
            placeholder='Buisness'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.business)}
          />
          <input
            name='phrase'
            id='phrase'
            value={phrase}
            placeholder='Catch phrase'
            data-testid='input'
            type='text'
            onChange={(e) => handleChange(e.target.value, FormElements.phrase)}
          />
        </div>
        <div className='button-container'>
          <button
            type='button'
            className='outlined'
            onClick={handleClose}
            data-testid={'close-btn'}
          >
            Close
          </button>
          <button type='submit' data-testid={'submit-btn'}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
