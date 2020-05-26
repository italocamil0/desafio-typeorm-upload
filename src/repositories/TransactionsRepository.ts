import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomes = await this.find({
      where: { type: 'income' },
    });

    const outcomes = await this.find({
      where: { type: 'outcome' },
    });

    const totalIncomes = incomes.reduce((sum, trans) => sum + trans.value, 0);
    const totalOutcomes = outcomes.reduce((sum, trans) => sum + trans.value, 0);

    return {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    };
  }
}

export default TransactionsRepository;
