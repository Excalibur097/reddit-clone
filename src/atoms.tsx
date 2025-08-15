import {atom, useAtom} from 'jotai'
import { type Group } from './types'

export const selectedGroupsAtom = atom<Group|null>(null)