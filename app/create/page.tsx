'use client'

import { useState } from 'react'
import ContentEditor from '../components/ContentEditor'
import PromptModal from '../components/PromptModal'

const CreateScreen = () => {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: false,
    twitter: false,
    linkedin: false,
  })
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState('')

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handlePlatformChange = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }))
  }

  const handleGenerateContent = async () => {
    setIsLoading(true)
    const newGeneratedContent: Record<string, string> = {}

    for (const platform of Object.keys(selectedPlatforms)) {
      if (selectedPlatforms[platform as keyof typeof selectedPlatforms]) {
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, platform }),
          })
          const data = await response.json()
          newGeneratedContent[platform] = data.content
        } catch (error) {
          console.error(`Error generating content for ${platform}:`, error)
        }
      }
    }

    setGeneratedContent(newGeneratedContent)
    setIsLoading(false)
  }

  const handleEditPrompt = (platform: string) => {
    setCurrentPlatform(platform)
    setIsPromptModalOpen(true)
  }

  const handlePublish = (platform: string) => {
    // TODO: Implement publish functionality
    console.log(`Publishing content for ${platform}`)
  }

  return (
    <div className="max-w-6xl mx-auto text-gray-800">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            placeholder="Enter your original content here..."
            value={content}
            onChange={handleContentChange}
          />
          <div className="mt-4 space-y-2">
            {Object.entries(selectedPlatforms).map(([platform, isSelected]) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePlatformChange(platform as keyof typeof selectedPlatforms)}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-gray-700 capitalize">{platform}</span>
              </label>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleGenerateContent}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Content'}
          </button>
        </div>
        <div>
          {Object.entries(generatedContent).map(([platform, content]) => (
            <div key={platform} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold capitalize text-gray-800">{platform}</h3>
                <div>
                  <button
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleEditPrompt(platform)}
                  >
                    Edit Prompt
                  </button>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => handlePublish(platform)}
                  >
                    Publish
                  </button>
                </div>
              </div>
              <ContentEditor
                initialContent={content}
                onChange={(newContent) => setGeneratedContent(prev => ({ ...prev, [platform]: newContent }))}
              />
            </div>
          ))}
        </div>
      </div>
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        platform={currentPlatform}
        onSubmit={async (prompt) => {
          try {
            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: prompt, platform: currentPlatform }),
            })
            const data = await response.json()
            setGeneratedContent(prev => ({ ...prev, [currentPlatform]: data.content }))
          } catch (error) {
            console.error('Error regenerating content:', error)
          }
          setIsPromptModalOpen(false)
        }}
      />
    </div>
  )
}

export default CreateScreen
