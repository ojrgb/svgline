import express from 'express'
import db from '../../db.js'

const router = express.Router()


router.get('/projects',async function(req,res) {
    await db.read()
    return db.data.projects
})

export default router