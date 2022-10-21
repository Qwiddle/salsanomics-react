import { useState, useEffect, useCallback, useRef } from 'react';
import constate from 'constate';
import { TempleWallet } from '@temple-wallet/dapp';

function useDApp({ appName }) {
  const [{ wallet, tezos, accountPkh }, setState] = useState(() => ({
    wallet: null,
    tezos: null,
    accountPkh: null,
  }));

  const ready = Boolean(tezos);

  useEffect(() => {
    return TempleWallet.onAvailabilityChange(async (available) => {
      if (available) {
        try {
          const perm = await TempleWallet.getCurrentPermission();
          const wlt = new TempleWallet(appName, perm);

          setState({
            wallet: wlt,
            tezos: wlt.connected ? wlt.toTezos() : null,
            accountPkh: wlt.connected ? await wlt.getPKH() : null,
          });
        } catch {
          throw new Error('Cannot get wallet permissions');
        }
      } else {
        setState({
          wallet: null,
          tezos: null,
          accountPkh: null,
        });
      }
    });
  }, [appName, setState]);

  useEffect(() => {
    if (!wallet && wallet.connected) {
      throw new Error('Not connected');
    }

    return TempleWallet.onPermissionChange((perm) => {
      if (!perm) {
        setState({
          wallet: new TempleWallet(appName),
          tezos: null,
          accountPkh: null,
        });
      }
    });
  }, [wallet, appName, setState]);

  const connect = useCallback(
    async (network, opts) => {
      if (!wallet) {
        throw new Error('Temple Wallet not available');
      }

      try {
        await wallet.connect(network, opts);

        const tzs = wallet.toTezos();
        const pkh = await tzs.wallet.pkh();

        setState({
          wallet,
          tezos: tzs,
          accountPkh: pkh,
        });
      } catch (err) {
        throw new Error(`Failed to connect TempleWallet: ${err.message}`);
      }
    },
    [setState, wallet]
  );

  return {
    wallet,
    tezos,
    accountPkh,
    ready,
    connect,
  };
}

export function useOnBlock(tezos, callback) {
  const blockHashRef = useRef();

  useEffect(() => {
    let sub;

    function spawnSub() {
      sub = tezos.stream.subscribe('head');

      sub.on('data', (hash) => {
        if (blockHashRef.current && blockHashRef.current !== hash) {
          callback(hash);
        }

        blockHashRef.current = hash;
      });

      sub.on('error', (err) => {
        if (process.env.NODE_ENV === 'development') {
          throw new Error(err);
        }

        sub.close();
        spawnSub();
      });
    }

    spawnSub();
    return () => sub.close();
  }, [tezos, callback]);
}

export const [DAppProvider, useWallet, useTezos, useAccountPkh, useReady, useConnect] = constate(
  useDApp,
  (v) => v.wallet,
  (v) => v.tezos,
  (v) => v.accountPkh,
  (v) => v.ready,
  (v) => v.connect
);
