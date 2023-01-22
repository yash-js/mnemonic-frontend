import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export const useRichTextEditor = () => {
    const [richtextdata, setRichtextdata] = useState((e) => EditorState.createEmpty(e));
    const htmldata = draftToHtml(convertToRaw(richtextdata.getCurrentContent()))
    const draftdata = htmlToDraft(htmldata)

    useEffect(() => {
        console.log("htmldata", htmldata)
    }, [htmldata])

    return{
        richtextdata,
        setRichtextdata,
        htmldata,
        draftdata
    }
}