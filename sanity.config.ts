/**
 * Sanity Studio configuration for the studio mounted at `app/(admin)/studio/[[...index]]/page.tsx`
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, defaultTheme } from 'sanity'
import { deskTool } from 'sanity/desk'
import { buildTheme } from '@sanity/ui/theme'
import React from 'react'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'
import { structure } from './sanity/structure'

const fontFamily = '"Fira Code", ui-monospace, monospace'

function BlogoLogo() {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: '"Lilita One", system-ui, sans-serif',
        fontSize: 22,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      },
    },
    React.createElement('span', null, 'AUI'),
    React.createElement('span', { style: { color: '#a855f7' } }, 'Blogo'),
  )
}

const theme = buildTheme({
  font: {
    code: { ...defaultTheme.fonts.code, family: fontFamily },
    heading: { ...defaultTheme.fonts.heading, family: fontFamily },
    label: { ...defaultTheme.fonts.label, family: fontFamily },
    text: { ...defaultTheme.fonts.text, family: fontFamily },
  },
  color: {
    selectable: {
      default: { _hue: 'purple' },
      primary: { _hue: 'purple' },
    },
  },
})

export default defineConfig({
  name: 'aui-blogo',
  title: 'AUI Blogo',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  theme,
  components: {
    logo: BlogoLogo,
  },
  plugins: [
    deskTool({ structure }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})