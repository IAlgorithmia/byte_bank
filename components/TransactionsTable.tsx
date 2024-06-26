import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    cn,
    formatAmount,
    formatDateTime,
    getTransactionStatus,
    removeSpecialCharacters,
} from '@/lib/utils';
import { transactionCategoryStyles } from '@/constants';

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
        transactionCategoryStyles[
            category as keyof typeof transactionCategoryStyles
        ] || transactionCategoryStyles.default;
    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor )}>
            <div className={cn('size-2 rounded-full', backgroundColor)}></div>
            <p className={cn('font-medium text-[12px]', textColor)}>{category}</p>
        </div>
    );
};
const TransactionsTable = ({ transactions }: TransactionTableProps) => {
    return (
        <Table className='overflow-auto'>
            <TableHeader className="bg-[#f9fafb]">
                <TableRow>
                    <TableHead className="">Transaction</TableHead>
                    <TableHead className="">Amount</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Date</TableHead>
                    <TableHead className=" hidden md:table-cell">
                        Channel
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Category
                    </TableHead>
                </TableRow>
                
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date));
                    const amount = formatAmount(t.amount);
                    const isDebit = t.type === 'debit';
                    const isCredit = t.type === 'credit';
                    return (
                        <TableRow
                            key={t.id}
                            className={`${
                                isDebit || amount[0] === '-'
                                    ? 'bg-[#FFFBFA]'
                                    : 'bg-[#F6FEF9]'
                            } !hover:bg-none !border-b-DEFAULT`}
                        >
                            <TableCell className="max-w-[150px] pl-2 pr-10">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell
                                className={`p-2 min-w-full pr-10 font-semibold ${
                                    isDebit || amount[0] === '-'
                                        ? 'text-[#f04438]'
                                        : 'text-[#039855]'
                                }`}
                            >
                                {isDebit
                                    ? `-${amount}`
                                    : isCredit
                                    ? amount
                                    : amount}
                            </TableCell>
                            <TableCell className="pl-2 pr-10">
                                <CategoryBadge category={status} />
                            </TableCell>
                            <TableCell className="min-w-32 pl-2 pr-10">
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>
                            <TableCell className="pl-2 pr-10 capitalize min-w-24 hidden md:table-cell">
                                {t.paymentChannel}
                            </TableCell>
                            <TableCell className="pl-2 pr-10 hidden md:table-cell">
                                <CategoryBadge category={t.category} />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default TransactionsTable;
