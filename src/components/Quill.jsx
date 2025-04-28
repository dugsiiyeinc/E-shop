import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill-new'
import './quill.snow.css'
// import 'react-quill-new/quill.snow.css'

export const QuillEditor = ({value, onChange, placeholder, className, height=400}, ref) => {
    
    const quillRef=useRef()

    const [editorValue, setEditorValue]=useState(value || '')

    // Updates locak state when value prop change
    useEffect(()=>{
        setEditorValue(value || '')
    },[value])



 const handleChange=useCallback((value)=>{
    setEditorValue(value)
    onChange(value)
 },[onChange])


//  setadd modules
    const modules={
        toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header':1},{'header':2},{'header':3},{'header':4}],
            [{'list':'ordered'}, {'list':'bullet'}],
            [{'script':'sub'},{'script':'super'}],
            [{'indent':'-1'},{'indent':'+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }

    // format editor
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'list',
        'script',
        'indent',
        'link', 'image', 'video'
      ];
      
    return (
    <div className={className || ''} style={{height:`${height}px`}}>
        <ReactQuill
          ref={quillRef}
          value={editorValue}
          onChange={handleChange}
          placeholder={placeholder || 'Write your content...'}
        //   theme='snow'
          style={{height:`${height - 42}px`}}
          modules={modules}
          formats={formats}
        />
    </div> 
  )
}