
export default async function handleSubmit (event, data) {
    // event.preventDefault()
  
    handleClear()

      const JSONdata = JSON.stringify(data)
  
    const endpoint = '/api/todo'
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata
    }
  
    const response = await fetch(endpoint, options)
  
    const result = await response.json()

    router.push({
    pathname: `/`,
    })
}