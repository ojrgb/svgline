const root = 'http://localhost:3000/api/v1/'
const post = async (props: {collection: String, json: any}) => {
return await fetch(root + props.collection, {
  method: "POST",
  body: JSON.stringify({json: props.json}),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  }
})};

const save = async (props: {json: any}) => {
    const res = await post({collection: 'flows', json: props.json})
    return res.text()
}

const saveAsset = async (props: {file: File}) => {
  const formData = new FormData();
  formData.append('file', props.file);

  const res = await fetch(root + 'assets', {
    method: "POST",
    body: formData,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    }
  });

  return res
}

const get = async (props: {collection: String, _id?: String}) => {
    const res = await fetch(root + props.collection + (props._id ? '/' + props._id : ''))
    return await res.json()
}

const dataService = {save, get, saveAsset}

export default dataService