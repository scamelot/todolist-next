// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import clientPromise from '../../lib/mongodb'


export default async (req, res) => {

  const client = await clientPromise
  const db = client.db('todo')
  let todos = await db.collection('todos').find({}).toArray()
  todos = JSON.stringify(todos)

  if (req.method == "GET") {
    res.status(200).json({ todos })
  }

  else if (req.method == ('POST' || 'PUT' )) {
    console.log(req.body)
    db.collection("todos").updateOne(
      {"_id":ObjectId(req.body.id)},
      { $set: {
          title: req.body.title,
          text: req.body.text,
          completed : req.body.completed
      }},
      {
          upsert: true
      }
    )
    res.status(200).json(req.body)
  }
  else if (req.method == 'DELETE') {
    db.collection("todos").deleteOne(
            {
              _id: ObjectId(req.body.id)
            }
    )
    res.json('success')
  }
}
