export interface ICart {
  id?: string,
  name?: string,
  price?: string,
  quantity?: number,
  total?: string,
}

export class Cart implements ICart {
  constructor(
    public id?: string,
    public name?: string,
    public price?: string,
    public quantity?: number,
    public total?: string,
  ) {
  }
}
