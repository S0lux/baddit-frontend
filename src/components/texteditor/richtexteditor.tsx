"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./global.css";

const RichTextEditor = () => {
  const [editorHtml, setEditorHtml] = useState<string>('');

  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  return (
    <div className='w-full mb-4'>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Write something..."
        className='my-4 dark:border-secondary-40 border-gray-500 rounded-md text-gray-800 dark:text-white lg:text-base'
      />
    </div>
  );
};

RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'align',
  'link', 'image', 'video'
];

export default RichTextEditor;
