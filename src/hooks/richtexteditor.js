import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
    
export const useRichTextEditor = () => {
    const [richtextdata, setRichtextdata] = useState((e) => EditorState.createEmpty(e))
    const savedata = localStorage.getItem('notedata') ? JSON.parse(localStorage.getItem('notedata')) : richtextdata
    const draftdata = htmlToDraft(savedata)

    useEffect(() => {
        localStorage.setItem('notedata', JSON.stringify(draftToHtml(convertToRaw(richtextdata.getCurrentContent()))));
    }, [richtextdata])

    return {
        richtextdata,
        setRichtextdata,
        savedata,
        draftdata
    }
}