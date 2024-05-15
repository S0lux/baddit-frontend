import RichTextEditor from '@/src/components/texteditor/richtexteditor'
import React from 'react'

export default function TextPost() {
    return (
        <div>
            <div className='mb-4 w-full'>
                <RichTextEditor />
            </div>
        </div>
    )
}
