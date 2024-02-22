import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import * as Toolbar from '@radix-ui/react-toolbar'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  LetterCaseCapitalizeIcon,
  HeadingIcon,
  QuoteIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';


export function App() {
  const toggleItemClasses = 'gap-1 flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11'

  const [link, setLink] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: `Start writing something here...`,
        emptyNodeClass: 'before:text-mauve9 before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none'
      }),
      Link.configure({
        protocols: ['mailto']
      })
    ],
    editorProps: {
      attributes: {
        class: 'outline-none bg-mauve1 border border-mauve3 max-w-5xl mx-auto pt-12 px-12 prose prose-violet min-h-screen overflow-hidden'
      }
    }
  })


  if (!editor) {
    return null
  }

  function handleSetLinkButton() {

    if (link === null) {
      return
    }

    if (link === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: link }).run()

    setLink('')
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
            <Toolbar.ToggleGroup type="single" aria-label="Turn into">
              <DropdownMenu.Root>
                <Toolbar.Button
                  asChild
                  className={toggleItemClasses}
                  value="turninto"
                >
                  <DropdownMenu.Trigger>
                    {
                      editor.isActive('heading', { level: 1 }) ? 'Heading 1' :
                      editor.isActive('heading', { level: 2 }) ? 'Heading 2' :
                      editor.isActive('heading', { level: 3 }) ? 'Heading 3' :
                      editor.isActive('blockquote') ? 'Quote' :
                      'Text'
                    }
                    <ChevronDownIcon />
                  </DropdownMenu.Trigger>
                </Toolbar.Button>

                <DropdownMenu.Content
                  className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={5}
                >
                  <DropdownMenu.Item
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className="group text-sm leading-none pl-4 text-violet11 rounded-md flex gap-2 items-center px-1 py-4 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  >
                    <LetterCaseCapitalizeIcon className='size-6' />Text
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className="group text-sm leading-none pl-4 text-violet11 rounded-md flex gap-2 items-center px-1 py-4 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  >
                    <HeadingIcon className='size-6' /> Heading 1
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className="group text-sm leading-none pl-4 text-violet11 rounded-md flex gap-2 items-center px-1 py-4 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  >
                    <HeadingIcon className='size-6' /> Heading 2
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className="group text-sm leading-none pl-4 text-violet11 rounded-md flex gap-2 items-center px-1 py-4 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  >
                    <HeadingIcon className='size-6' /> Heading 3
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className="group text-sm leading-none pl-4 text-violet11 rounded-md flex gap-2 items-center px-1 py-4 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  >
                    <QuoteIcon className='size-6' /> Quote
                  </DropdownMenu.Item>
                  <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Toolbar.ToggleGroup>

            <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />

            <Toolbar.ToggleGroup type="single" aria-label="Add link">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Toolbar.ToggleItem
                    // onClick={setLink}
                    data-state={editor.isActive('link') && 'on'}
                    className={toggleItemClasses}
                    value="link"
                    aria-label="Add link"
                  >
                    <ExternalLinkIcon /> Link
                  </Toolbar.ToggleItem>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                  <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <input
                      className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      id="link"
                      name="link"
                      placeholder='Type or paste a link'
                      value={link}
                      onChange={e => setLink(e.currentTarget.value)}
                    />
                    <div className="mt-[25px] flex justify-end">
                      <Dialog.Close asChild>
                        <button
                          onClick={handleSetLinkButton}
                          className="bg-violet4 text-violet11 hover:bg-violet5 focus:shadow-violet7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                        >
                          Save changes
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </Toolbar.ToggleGroup>

            <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />

            <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-state={editor.isActive('bold') && 'on'}
                className={toggleItemClasses}
                value="bold"
                aria-label="Bold"
              >
                <FontBoldIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-state={editor.isActive('italic') && 'on'}
                className={toggleItemClasses}
                value="italic"
                aria-label="Italic"
              >
                <FontItalicIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                data-state={editor.isActive('underline') && 'on'}
                className={toggleItemClasses}
                value="underline"
                aria-label="Underline"
              >
                <UnderlineIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-state={editor.isActive('strike') && 'on'}
                className={toggleItemClasses}
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
                className={toggleItemClasses}
                value="left"
                aria-label="Left aligned"
              >
                <TextAlignLeftIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                data-state={editor.isActive({ textAlign: 'center' }) && 'on'}
                className={toggleItemClasses}
                value="center"
                aria-label="Center aligned"
              >
                <TextAlignCenterIcon />
              </Toolbar.ToggleItem>

              <Toolbar.ToggleItem
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                data-state={editor.isActive({ textAlign: 'right' }) && 'on'}
                className={toggleItemClasses}
                value="right"
                aria-label="Right aligned"
              >
                <TextAlignRightIcon />
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar.Root>
        </BubbleMenu >
      )
      }
      
      <EditorContent editor={editor} />
    </>
  )
}
