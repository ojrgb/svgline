const root = 'http://localhost:3001/api/v1/'
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
  
    const res = await post({url: 'http://localhost:3001/api/v1/packages', item: props.item})
 
    
    return res.text()
}

const get = async (props) => {
    const res = await fetch(root + props.entity)
    return await res.json()
}

const dataService = {save, get}

export default dataService