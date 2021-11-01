import React from 'react';
import { Transactions } from 'components';

export default function RecentTransactions(props) {
    return (
        <div className="table-responsive">
            <table className="table table-indent-rows margin-bottom-0">
                <tbody>
                    <Transactions.TRow />
                </tbody>
            </table>
        </div>
    );
}