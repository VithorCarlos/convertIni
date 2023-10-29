class Music {
  public code: string;
  public artist: string;
  public artistNormalized: string;
  public music: string;
  public musicNormalized: string;
  public start?: string;

  constructor (props: Music){
    Object.assign(this, props)
  }

}

export { Music }