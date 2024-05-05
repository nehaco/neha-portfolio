'use client'

import Code, { RawCode } from '@/components/code/Code'
import { Icons } from '@/components/icons/Icons'
import AnimatedTabs from '@/components/reusable/AnimatedTabs'
import { cn } from '@/lib/utils'
import { Code as CodeIcon, Eye } from 'lucide-react'
import * as React from 'react'
import { CopyButton } from './CopyButton'
import TailwindCSS from '../Logos/Tailwind'
import FramerLogo from '../Logos/Framer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  path: string
  align?: 'center' | 'start' | 'end'
  preview?: React.ReactNode
  usingFramer?: boolean
}

const formatName = (path: string) => {
  const parts = path.split('/')
  const componentName = parts[parts.length - 1]
  return componentName.replace(/([a-z])([A-Z])/g, '$1 $2')
}

/**
 * ComponentPreview renders a component preview with a preview and code tab.
 *
 * @param {string} path - The path to the component relative to `src/showcase`.
 * @param {boolean} usingFramer - Whether the component is using Framer Motion.
 * @param {React.ReactNode} preview - Optional preview to render instead of the component.
 * Example: "components/button/3DButton"
 *
 * Usage: <ComponentPreview path="components/button/3DButton" />
 *
 * Usage: <ComponentPreview path="components/button/3DButton" preview={<3DButton />} />
 */

export function ComponentPreview({
  path,
  className,
  align = 'center',
  preview,
  usingFramer,
  ...props
}: ComponentPreviewProps) {
  const name = formatName(path)

  const Preview = React.useMemo(() => {
    if (preview) return preview

    try {
      const Component = require(`../../showcase/${path}.tsx`).default
      return <Component />
    } catch (error) {
      console.error(`Failed to load component ${path}:`, error)
      return (
        <p className="text-muted-foreground text-sm">
          Component{' '}
          <RawCode className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {path}
          </RawCode>{' '}
          not found.
        </p>
      )
    }
  }, [path, preview])

  const codeString = React.useMemo(() => {
    try {
      const code = require(`!!raw-loader!../../showcase/${path}.tsx`).default
      const filteredCode = code.replace(/'use client'\n/, '')
      return filteredCode
    } catch (error) {
      console.error(`Failed to load code for component ${path}:`, error)
      return null
    }
  }, [path])

  const [selectedTab, setSelectedTab] = React.useState('preview')

  return (
    <div
      className={cn(
        'group relative my-10 flex w-full max-w-5xl flex-col space-y-2',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-md m-0 font-medium text-gray-800">{name}</h2>
          <div className="flex items-center justify-center gap-x-2">
            <div>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <TailwindCSS />
                  </TooltipTrigger>
                  <TooltipContent className="m-0 p-0 text-sm">
                    <p className="m-0 p-1">
                      This component requires{' '}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.framer.com/motion/"
                      >
                        Tailwind CSS
                      </a>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {usingFramer && (
              <div>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <FramerLogo />
                    </TooltipTrigger>
                    <TooltipContent className="m-0 p-0 text-sm">
                      <p className="m-0 p-1">
                        This component requires{' '}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.framer.com/motion/"
                        >
                          Framer Motion
                        </a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
        <AnimatedTabs
          tabs={['preview', 'code']}
          selected={selectedTab}
          setSelected={setSelectedTab}
          customID={path}
          icons={[Eye, CodeIcon]}
        />
      </div>
      {selectedTab === 'preview' && (
        <div className="relative rounded-md border">
          <CopyButton value={codeString} />
          <div>
            <div
              className={cn(
                'preview flex min-h-[250px] w-full justify-center p-10',
                {
                  'items-center': align === 'center',
                  'items-start': align === 'start',
                  'items-end': align === 'end',
                },
              )}
            >
              <React.Suspense
                fallback={
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </div>
        </div>
      )}
      {selectedTab === 'code' && (
        <div className="relative w-full">
          <Code language="tsx" code={codeString} />
        </div>
      )}
    </div>
  )
}
