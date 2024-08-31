'use client'

import { useState, useEffect } from 'react'

interface ContentEditorProps {
  initialContent: string
  onChange: (content: string) => void
}

const ContentEditor: React.FC<ContentEditorProps> = ({ initialContent, onChange }) => {
  const [content, setContent] = useState(initialContent)

  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }

  return (
    <textarea
      className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={content}
      onChange={handleChange}
    />
  )
}

export default ContentEditor
