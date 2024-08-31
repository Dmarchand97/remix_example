'use client'

import { useState, useEffect } from 'react'

interface PromptModalProps {
  isOpen: boolean
  onClose: () => void
  platform: string
  onSubmit: (prompt: string) => void
}

const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, platform, onSubmit }) => {
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    if (isOpen) {
      setPrompt(`Generate a ${platform} post based on the following content:`)
    }
  }, [isOpen, platform])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Prompt for {platform}</h2>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => onSubmit(prompt)}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromptModal
