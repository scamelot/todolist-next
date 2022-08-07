import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import clientPromise from '../lib/mongodb'
import TodoItem from './todoItem'
import InputField from './inputField.tsx'
import React, { useState } from 'react'

export default function Home({todos}) {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const todoList = JSON.parse(todos)

  const completedCount = todoList.filter(todo => todo.completed).length
  const todoCount = todoList.length

  const handleHeaderClick = async (event) => {
    console.log(title,text)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tasker</title>
        <meta name="description" content="TodoList in NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id='header' className="flex-col pt-4 justify-items-center sticky block border-b-4 bg-greybg rounded-md top-0">
        <h1 onClick={handleHeaderClick} className={'mb-10 text-6xl text-center'}>
          Tasker
        </h1>
        <h2 className='text-center text-xl font-bold pb-5'>{completedCount}/{todoCount} tasks complete</h2>
        <InputField clickedTitle={title} clickedText={text} />
        </div>
        <div className={styles.grid}>
        {todoList.reverse().map((todo) => (
          <TodoItem key={todoList.indexOf(todo)} id={todo._id} title={todo.title} text={todo.text} completed={todo.completed} />
        ))}
        </div>
      </main>

    </div>
  )
}
export async function getServerSideProps(context) {
  try {
    const client = await clientPromise
    const db = client.db('todo')
    let todos = await db.collection('todos').find({}).toArray()
    todos = JSON.stringify(todos)

    return {
      props: { todos: todos,
              isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}