import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import useRaceStore from './hooks/useRaceStorage';

type THorse = {
  container: HTMLElement;
  id: string;
  name: string;
};

function App() {
  // ボタン作成用情報
  const [buttonInfos, setButtonInfos] = useState<THorse[]>([]);
  // モーダル状態
  const [modalVisible, setModalVisible] = useState(false);
  // レースID
  const [raceId, setRaceId] = useState('');
  // 馬ID
  const [horseId, setHorseId] = useState('');
  // 馬名
  const [horseName, setHorseName] = useState('');
  // 入力テキスト
  const [input, setInput] = useState('');
  // メモ保存情報
  const { getMemo, setMemo } = useRaceStore(raceId);

  const getRaceId = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('race_id') || '';
    setRaceId(id);
  };

  const createButton = (el: HTMLElement) => {
    const id = el.id.replace('db_', '');
    const name = el.innerText.replace('のデータベース', '');

    const container = el?.parentElement?.parentElement;

    container &&
      setButtonInfos((prev) => {
        return [
          ...prev,
          {
            id,
            name,
            container,
          },
        ];
      });
  };

  useEffect(() => {
    getRaceId();
    // モーダル開くボタン作成
    const As = document.querySelectorAll<HTMLElement>(
      '.Horse_Info .Age .db_link a'
    );
    As.forEach((a) => createButton(a));
  }, []);

  // モーダルを開く
  const handleOpen = (horse: THorse) => {
    setHorseId(horse.id);
    setHorseName(horse.name);
    // setInput(getMemo(horse.id));
    setModalVisible(true);
  };

  // モーダルを閉じる
  const handleClose = () => {
    setModalVisible(false);
    setMemo(horseId, input);
    setInput('');
  };

  // テキストエリア入力
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  return (
    <div>
      {buttonInfos.map((el) => (
        <Button
          container={el.container}
          onClick={() => handleOpen(el)}
        ></Button>
      ))}
      <Modal
        raceId={raceId}
        horseId={horseId}
        header={horseName}
        open={modalVisible}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
