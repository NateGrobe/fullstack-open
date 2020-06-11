import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'www.test.ca',
      likes: 0,
    }


    component = render (
      <Blog blog={blog} testLikes={mockHandler}/>
    )
  })

  test('blog renders title and author by default', () => {
    const div = component.container.querySelector('.unexpanded-div')
    expect(div).toHaveTextContent(
      'Test Blog Test Author'
    )
  })

  test('blog renders url and likes when button has been clicked', () => {
    const button = component.getByText('view')

    fireEvent.click(button)

    const url = component.getByText('www.test.ca')
    const likes = component.container.querySelector('.likes')

    expect(url).toHaveTextContent('www.test.ca')
    expect(likes).toHaveTextContent(0)
  })

  test('event handler receives props twice when button is clicked twice', () => {
    const viewButton = component.getByText('view')

    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
