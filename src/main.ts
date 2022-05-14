import Controller from './Controller';
import HeaderView from './views/HeaderView';
import MainView from './views/MainView';
import ModalView from './views/ModalView';

document.addEventListener('DOMContentLoaded', main);

function main() {
  const views = {
    mainView: new MainView(),
    headerView: new HeaderView(),
    modalView: new ModalView(),
  };

  new Controller(views);
}
