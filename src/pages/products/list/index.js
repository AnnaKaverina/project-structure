import SortableTable from '../../../components/sortable-table/index';
import ProductInput from '../../../components/product-input/index';
import header from '../../bestsellers-header';

export default class Page {
  element;
  subElements = {};
  components = {};

  getTemplate = () => {
    return `
      <div class="products-list">
        <div class="content__top-panel">
          <h1 class="page-title">Товары</h1>
          <a href="/products/add" class="button-primary">Добавить товар</a>
        </div>
        <div class="content-box content-box_small" data-elem="contentBox"></div>
        <div data-elem="productsContainer" class="products-list__container"></div>
      </div>
    `
  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
    this.initComponents();
    await this.renderComponents();

    return this.element;
  }

  getSubElements(element) {
    const elements = {};

    const subElements = element.querySelectorAll('[data-elem]');

    for (const subElement of subElements) {
      elements[subElement.dataset.elem] = subElement;
    }

    return elements;
  }

  initComponents() {
    this.components.sortableTable = new SortableTable(header, {
      url: 'api/rest/products',
    });

    this.components.productInput = new ProductInput();
  }

  async renderComponents() {
    const { element: sortableTableElement  } = await this.components.sortableTable;
    const { element: productInputElement } = this.components.productInput;

    this.subElements.productsContainer.append(sortableTableElement);
    this.subElements.contentBox.append(productInputElement);
  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}