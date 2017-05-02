export interface INode { type: string }

export interface IBranch extends INode { children: INode[] }

export interface ILeaf extends INode { content: string }

export interface IHeading extends IBranch { h: string }

export interface IDocument extends IBranch { title: string }

export interface ILink extends IBranch { attrs: any }

export interface IImage extends ILeaf { attrs: any }

export interface IFenced extends ILeaf { lang: string }
