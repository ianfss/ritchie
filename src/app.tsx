import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit'
import * as Toolbar from '@radix-ui/react-toolbar';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon
} from '@radix-ui/react-icons';
import heading1 from './assets/heading1.png'
import heading2 from './assets/heading2.png'
import heading3 from './assets/heading3.png'
import plaintext from './assets/plaintext.png'


export function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: `Type something or press '/' for commands`,
        emptyNodeClass: 'before:text-mauve9 before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none'
      })
    ],
    editorProps: {
      attributes: {
        class: 'outline-none bg-mauve1 border border-mauve3 max-w-5xl mx-auto pt-12 px-12 prose min-h-screen overflow-hidden'
      }
    }
  })

  if (!editor) {
    return null
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
        >
          <Toolbar.Root
            className="flex p-[10px] w-full min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-blackA4"
            aria-label="Formatting options"
          >

            <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-state={editor.isActive('bold') && 'on'}
                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="bold"
                aria-label="Bold"
              >
                <FontBoldIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-state={editor.isActive('italic') && 'on'}
                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="italic"
                aria-label="Italic"
              >
                <FontItalicIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-state={editor.isActive('strike') && 'on'}
                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="strikethrough"
                aria-label="Strike through"
              >
                <StrikethroughIcon />
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>

            <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />

            <Toolbar.ToggleGroup type="single" aria-label="Text alignment">
              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                data-state={editor.isActive({ textAlign: 'left' }) && 'on'}
                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="left"
                aria-label="Left aligned"
              >
                <TextAlignLeftIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                data-state={editor.isActive({ textAlign: 'center' }) && 'on'}
                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="center"
                aria-label="Center aligned"
              >
                <TextAlignCenterIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                data-state={editor.isActive({ textAlign: 'right' }) && 'on'}
                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="right"
                aria-label="Right aligned"
              >
                <TextAlignRightIcon />
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar.Root>
        </BubbleMenu >
      )}

      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            return state.selection.$from.nodeBefore?.textContent === '/'
          }}
        >
          <ToggleGroup.Root
            orientation="vertical"
            className="inline-flex flex-col bg-mauve6 rounded shadow-[0_2px_10px] shadow-blackA4 space-x-px"
            type="single"
            defaultValue="plaintext"
            aria-label="Commands"
          >
            <ToggleGroup.Item
              onClick={() => editor.chain().focus().clearContent().run()}
              className="text-left items-center gap-4 hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex p-4 bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none" value="plaintext" aria-label="Plain Text"
            >
              <img src={plaintext} alt="" className='size-12 rounded-md' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-mauve11'>Text</span>
                <span className='text-xs text-mauve10'>Just start writing with plain text</span>
              </div>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="text-left items-center gap-4 hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex p-4 bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none" value="heading1" aria-label="Heading 1"
            >
              <img src={heading1} alt="" className='size-12 rounded-md' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-mauve11'>Heading 1</span>
                <span className='text-xs text-mauve10'>Create a big heading section</span>
              </div>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="text-left items-center gap-4 hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex p-4 bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none" value="heading2" aria-label="Heading 1"
            >
              <img src={heading2} alt="" className='size-12 rounded-md' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-mauve11'>Heading 2</span>
                <span className='text-xs text-mauve10'>Create a medium heading section</span>
              </div>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className="text-left items-center gap-4 hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex p-4 bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none" value="heading3" aria-label="Heading 1"
            >
              <img src={heading3} alt="" className='size-12 rounded-md' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-mauve11'>Heading 3</span>
                <span className='text-xs text-mauve10'>Create a small heading section</span>
              </div>
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </FloatingMenu >
      )}

      <EditorContent editor={editor} />
    </>
  )
}
