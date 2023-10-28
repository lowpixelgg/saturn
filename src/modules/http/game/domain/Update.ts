import { Entity } from '@core/domain/Entity';
import { v4 } from 'uuid';

interface IUpdateProps {
  product: string;
  version: string;
  download: string;
  sha1: string;
  rm: string[];
  directory: string;
  release: string;
}

export class Update extends Entity<IUpdateProps> {
  get product() {
    return this.props.product;
  }

  get version() {
    return this.props.version;
  }

  get download() {
    return this.props.download;
  }

  get sha1() {
    return this.props.sha1;
  }

  get rm() {
    return this.props.rm;
  }

  get directory() {
    return this.props.directory;
  }

  get release() {
    return this.props.release;
  }

  private constructor(props: IUpdateProps, id?: string) {
    super(props, id);
  }

  static create(props: IUpdateProps, id?: string): Update {
    return new Update(props, id ? id : v4());
  }
}
