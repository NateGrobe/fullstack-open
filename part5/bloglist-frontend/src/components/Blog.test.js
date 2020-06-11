import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('blog renders title and author by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'www.test.ca',
      likes: 0,
    }

    const component = render(
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.unexpanded-div')
    expect(div).toHaveTextContent(
      'Test Blog Test Author'
    )
  })
})
