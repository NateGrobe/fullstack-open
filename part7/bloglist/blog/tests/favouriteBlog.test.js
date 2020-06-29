const listHelper = require('../utils/list_helper')

describe('The blog post with the most likes', () => {

  const emptyBlogList = []
  
  const listWithSingleFav = [ 
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }, 
    { 
      _id: "5a422ba71b54a676234d17fb", 
      title: "TDD harms architecture", 
      author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
      likes: 0, 
      __v: 0 
    }, 
    { 
      _id: "5a422bc61b54a676234d17fc", 
      title: "Type wars", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
      likes: 2, 
      __v: 0 
    }
  ]

  const listWithNoFav = [ 
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 0, 
      __v: 0 
    }, 
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 0, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 0, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 0, 
      __v: 0 
    }, 
    { 
      _id: "5a422ba71b54a676234d17fb", 
      title: "TDD harms architecture", 
      author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
      likes: 0, 
      __v: 0 
    }, 
    { 
      _id: "5a422bc61b54a676234d17fc", 
      title: "Type wars", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
      likes: 0, 
      __v: 0 
    }
  ]

  test('when there are no posts return a message', () => {
    const result = listHelper.favouriteBlog(emptyBlogList)
    expect(result).toEqual('There are currently no blog posts')
  })

  test('when there is a single most liked post', () => { 
    const result = listHelper.favouriteBlog(listWithSingleFav)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
  })

  test('when there is no favourite blog return the first one', () => { 
    const result = listHelper.favouriteBlog(listWithNoFav)
    expect(result).toEqual(
      {
        title: "React patterns", 
        author: "Michael Chan", 
        likes: 0, 
      }
    )
  })
})
