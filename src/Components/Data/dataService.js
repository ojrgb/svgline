const save = async (props) => {
    const res = await fetch('/api/v1/projects')
    return res.text()
}

const dataService = {save}

export default dataService