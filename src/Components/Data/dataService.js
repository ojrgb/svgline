const post = async (props) => {
return await fetch(props.url, {
  method: "POST",
  body: JSON.stringify(props.item),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  }
})};

const save = async (props) => {
    console.log("Getting it.")
    const res = await post({url: 'http://localhost:3001/api/v1/packages', item: props.item})
    console.log(res)
    
    return res.text()
}

const dataService = {save}

export default dataService