'use client'

import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import CreateModal from './create.modal';
import UpdateModal from './update.modal';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    blogs: IBlog[]
}

function AppTable(props: IProps) {
    const { blogs } = props

    const [blog, setBlog] = useState<IBlog | null>(null)
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

    const handleDeleteBlog = (id: number) => {
        if (confirm(`Do you want to delete this blog (id = ${id})`)) {
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    if (res) {
                        toast.success("Blog deleted successfully");
                        mutate("http://localhost:8000/blogs")
                    }
                })
        }
    }

    return (
        <>
            <div
                className='mb-3'
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <h3>Table Blogs</h3>
                <Button variant='success' onClick={() => setShowModalCreate(true)}>Add new</Button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>
                                    <Link href={`blogs/${item.id}`} className='btn btn-primary'>View</Link>
                                    <Button variant='warning' className='mx-3' onClick={() => {
                                        setBlog(item);
                                        setShowModalUpdate(true);
                                    }}>Edit</Button>
                                    <Button variant='danger' onClick={() => handleDeleteBlog(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                blog={blog}
                setBlog={setBlog}
            />
        </>

    );
}

export default AppTable;