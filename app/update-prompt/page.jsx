"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from '@components/Form'

export default function UpdatePrompt() 
{
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if(!promptId) return

        try
        {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if(response.ok) router.push('/profile')
        }
        catch(e)
        {
            console.error(e)
        }
        finally
        {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        const fetchPrompt = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if(promptId) fetchPrompt()
    }, [promptId])

    return (
        <Form 
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}
