export class Link {
  constructor(public href: string) {
  }
}

export class LanguageLinks {
  constructor(public self: Link, language: Link) {
  }
}

export class Language {
  constructor(public _links: LanguageLinks, public name: string) {
  }
}
